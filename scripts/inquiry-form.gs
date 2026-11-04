/**
 * Full School Marketing website: the contact form's receiver (Google Apps Script).
 *
 * Bound to the "FSM Website Inquiries" Google Sheet (Extensions, then Apps Script, in that sheet). The site's form
 * (src/concepts/visible/FsmForm.tsx) posts one JSON document per submission to this script's web app URL
 * (siteConfig.inquiryForm.endpoint). The script appends a row to the "Inquiries" tab and emails the addresses listed
 * in cell B1 of the "Settings" tab. Nothing else reads or writes the sheet.
 *
 * Deploying (the sheet's owner, in the browser):
 *   1. Paste this file over Code.gs in the sheet's Apps Script project and save.
 *   2. Deploy, then New deployment, type Web app. Execute as: Me. Who has access: Anyone (not "Anyone with a Google
 *      account", which would answer the site's post with a sign-in page).
 *   3. Authorize when asked (spreadsheet and email scopes). Copy the web app URL (ends in /exec) into
 *      src/content/config.ts, inquiryForm.endpoint, and rebuild the site.
 *   4. After any change to this code: Deploy, then Manage deployments, edit, New version. The URL stays the same.
 *
 * Checks: opening the web app URL in a browser shows "FSM inquiry receiver is up". A submission from the site adds a
 * row within a second or two and sends the email; an email failure is written to the row's Notified column and the
 * row is kept.
 */

var INQUIRIES_TAB = 'Inquiries';
var SETTINGS_TAB = 'Settings';
/** Submissions that arrive faster than this after the form was shown are treated as bots (the page sends `seconds`). */
var MIN_SECONDS = 3;
var REQUIRED = ['full_name', 'email', 'phone', 'services', 'lead_source', 'budget', 'needs'];
var LIMITS = { full_name: 200, email: 200, phone: 60, services: 120, lead_source: 120, budget: 120, needs: 4000, page: 300, referrer: 300 };

function doGet() {
  return ContentService.createTextOutput('FSM inquiry receiver is up').setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: 'The submission could not be read.' });
  }
  // Bots fill the hidden "website" field or submit instantly; both get a quiet success and no row.
  if (data.website) return reply({ ok: true, ignored: 'honeypot' });
  if (!(Number(data.seconds) >= MIN_SECONDS)) return reply({ ok: true, ignored: 'too fast' });

  var missing = REQUIRED.filter(function (k) { return !clean(data[k], 10).length; });
  if (missing.length) return reply({ ok: false, error: 'Missing: ' + missing.join(', ') + '.' });
  if (data.consent !== true) return reply({ ok: false, error: 'The consent box must be checked.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean(data.email, LIMITS.email))) return reply({ ok: false, error: 'The email address does not look right.' });

  var row = [
    new Date(),
    clean(data.full_name, LIMITS.full_name),
    clean(data.email, LIMITS.email),
    clean(data.phone, LIMITS.phone),
    clean(data.services, LIMITS.services),
    clean(data.lead_source, LIMITS.lead_source),
    clean(data.budget, LIMITS.budget),
    clean(data.needs, LIMITS.needs),
    'Yes',
    clean(data.page, LIMITS.page),
    clean(data.referrer, LIMITS.referrer),
    '',
  ];

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(INQUIRIES_TAB);
  if (!sheet) return reply({ ok: false, error: 'The "' + INQUIRIES_TAB + '" tab is missing.' });

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  var rowNumber;
  try {
    sheet.appendRow(row);
    rowNumber = sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }

  var notified;
  try {
    notified = notify(ss, row);
  } catch (err) {
    notified = 'error: ' + (err && err.message ? err.message : err);
  }
  sheet.getRange(rowNumber, row.length).setValue(notified);
  return reply({ ok: true });
}

/** Emails the addresses in Settings!B1. Returns what happened, for the row's Notified column. */
function notify(ss, row) {
  var settings = ss.getSheetByName(SETTINGS_TAB);
  if (!settings) return 'no Settings tab';
  var to = String(settings.getRange('B1').getValue() || '')
    .split(',')
    .map(function (s) { return s.trim(); })
    .filter(Boolean);
  if (!to.length) return 'no recipients in Settings!B1';
  var prefix = String(settings.getRange('B2').getValue() || 'FSM website inquiry');
  var name = row[1], email = row[2], phone = row[3], service = row[4], source = row[5], budget = row[6], needs = row[7], page = row[9];
  var body = [
    'New inquiry from the Full School Marketing website.',
    '',
    'Name: ' + name,
    'Email: ' + email,
    'Phone: ' + phone,
    'Service: ' + service,
    'Heard about us: ' + source,
    'Budget: ' + budget,
    '',
    'About the school:',
    needs,
    '',
    'Page: ' + page,
    'All inquiries: ' + ss.getUrl(),
  ].join('\n');
  MailApp.sendEmail({ to: to.join(','), replyTo: email, subject: prefix + ': ' + name, body: body });
  return 'sent to ' + to.join(', ') + ' at ' + new Date().toISOString();
}

function clean(value, max) {
  return String(value == null ? '' : value).replace(/\s+/g, ' ').trim().slice(0, max);
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
