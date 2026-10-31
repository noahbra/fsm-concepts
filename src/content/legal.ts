import { siteConfig } from './config';

/**
 * The site's two legal pages, as structured content. Rendered by src/concepts/bold/LegalPage.tsx at bold/terms/ and
 * bold/privacy/ (the production site serves them at /terms/ and /privacy/).
 *
 * SOURCE. Both documents are FilmTwist's own published legal pages, restructured for reading: the Terms and Conditions
 * at filmtwist.com/terms-and-conditions ("Last updated Oct 13, 2024") and the Privacy Policy at
 * filmtwist.com/privacy-policy ("Last updated May 09, 2024"), both read on October 31, 2026. The substance is theirs;
 * this site adds a plain one-line summary under each heading (`short`), numbers the sections, sets the all-capitals
 * blocks in sentence case inside a marked notice, and names this site and the contact form where the originals named
 * filmtwist.com. Every place the text departs from the source is listed in docs/CONTENT_AND_CLAIMS.md under
 * "Legal pages" and is REQUIRES_CLIENT_CONFIRMATION. Nothing here is legal advice; FilmTwist signs this off.
 *
 * Inline markup in text: `[label](href)` for a link, `**text**` for bold. An href of `terms`, `privacy` or `home`
 * resolves to the sibling page or the main page; anything else is used as written.
 */
export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'notice'; text: string }
  | { type: 'contact' };

export interface LegalSection {
  id: string;
  title: string;
  /** The plain summary under the heading. The section text, not the summary, is what applies. */
  short: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  id: 'terms' | 'privacy';
  title: string;
  description: string;
  updated: string;
  lede: string;
  intro: LegalBlock[];
  sections: LegalSection[];
}

const L = siteConfig.legal;
const EMAIL = `[${L.email}](mailto:${L.email})`;
const PHONE = `[${L.phone}](tel:${L.phone.replace(/[^+\d]/g, '')})`;

export const terms: LegalDoc = {
  id: 'terms',
  title: 'Terms and conditions',
  description: `The terms that apply when you use ${L.siteHost}, the website of Full School Marketing, a practice of ${L.dba}.`,
  updated: L.updated,
  lede: `The agreement between you and ${L.dba} when you use this website. The short line under each heading is a summary. The text below it is what applies.`,
  intro: [
    {
      type: 'p',
      text: `Full School Marketing is the K-12 school enrollment practice of ${L.entity}, doing business as ${L.dba} ("Filmtwist", "we", "us", "our"), a California company at ${L.address.join(', ')}. You can reach us at ${EMAIL} or ${PHONE}.`,
    },
    {
      type: 'p',
      text: `These terms cover the website at ${L.siteHost} and any other products and services that link to them (together, the "Services"). They are a legally binding agreement between you, whether personally or on behalf of a school or other organization ("you"), and Filmtwist. By using the Services you confirm that you have read, understood and agreed to all of these terms. **If you do not agree with all of them, do not use the Services.**`,
    },
    {
      type: 'p',
      text: 'The Services are for people who are at least 18 years old. Anyone under 18 may not use them.',
    },
    {
      type: 'p',
      text: `We will give you notice before scheduled changes to the Services you use. Changed terms take effect when we post them here or notify you by email from ${L.email}. Continuing to use the Services after that date means you accept the changes. We recommend keeping a copy of these terms for your records.`,
    },
  ],
  sections: [
    {
      id: 'services',
      title: '1. Our services',
      short: 'This website is meant for schools and organizations in the United States.',
      blocks: [
        { type: 'p', text: 'The information on the Services is not intended for distribution to or use by any person or entity in a jurisdiction or country where that would be contrary to law or regulation, or would subject us to a registration requirement there. If you access the Services from another location you do so on your own initiative and are solely responsible for complying with local law, if and to the extent it applies.' },
        { type: 'p', text: 'The Services are not tailored to comply with industry-specific regulations such as the Health Insurance Portability and Accountability Act (HIPAA) or the Federal Information Security Management Act (FISMA). If your interactions with us would be subject to such laws, you may not use the Services. You may not use the Services in a way that would violate the Gramm-Leach-Bliley Act (GLBA).' },
      ],
    },
    {
      id: 'intellectual-property',
      title: '2. Intellectual property',
      short: 'The site and its content belong to Filmtwist or its licensors. You may read and print it for your own use, not republish it.',
      blocks: [
        { type: 'h3', text: 'What we own' },
        { type: 'p', text: 'We own or license all intellectual property rights in the Services, including the source code, databases, functionality, software, website design, audio, video, text, photographs and graphics (the "Content"), and the trademarks, service marks and logos in them (the "Marks"). The Content and Marks are protected by copyright and trademark law, other intellectual property and unfair competition law, and treaties in the United States and around the world. Work shown as done for or with a school, including that school\'s name and logo, remains the property of its owner.' },
        { type: 'p', text: 'The Content and Marks are provided in or through the Services "as is", for your personal, non-commercial use or internal business purposes only.' },
        { type: 'h3', text: 'What you may do' },
        { type: 'p', text: 'Subject to these terms, including the "Prohibited uses" section below, we grant you a non-exclusive, non-transferable, revocable license to access the Services and to download or print a copy of any part of the Content you have properly gained access to, solely for your personal, non-commercial use or internal business purposes.' },
        { type: 'p', text: `Except as set out in this section or elsewhere in these terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed or otherwise exploited for any commercial purpose without our express prior written permission. To ask for any other use, write to ${EMAIL}. If we grant permission to post, reproduce or publicly display any part of the Services or Content, you must identify us as the owner or licensor and keep any copyright or proprietary notice visible.` },
        { type: 'p', text: 'We reserve all rights not expressly granted to you in the Services, Content and Marks. Any breach of these intellectual property rights is a material breach of these terms, and your right to use the Services ends immediately.' },
      ],
    },
    {
      id: 'submissions',
      title: '3. What you send us',
      short: 'Questions, feedback and ideas you send us may be used by us. Do not send anything confidential or that belongs to someone else.',
      blocks: [
        { type: 'p', text: 'This website does not let you post or publish content for other visitors to see. A message sent through the contact form, or by email, goes to us.' },
        { type: 'p', text: 'By sending us any question, comment, suggestion, idea, feedback or other information about the Services ("Submissions"), you assign to us all intellectual property rights in that Submission. We own it and may use and share it for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.' },
        { type: 'p', text: 'By sending us a Submission you:' },
        {
          type: 'ul',
          items: [
            'confirm that you have read and agree with the "Prohibited uses" section, and will not send us anything that is illegal, harassing, hateful, harmful, defamatory, obscene, bullying, abusive, discriminatory, threatening to any person or group, sexually explicit, false, inaccurate, deceitful or misleading;',
            'waive any moral rights in the Submission, to the extent the law allows;',
            'warrant that the Submission is original to you, or that you have the rights and licenses needed to send it and full authority to grant us the rights above; and',
            'warrant that the Submission is not confidential information.',
          ],
        },
        { type: 'p', text: 'You are solely responsible for your Submissions and agree to reimburse us for any losses we suffer because of your breach of this section, of a third party\'s intellectual property rights, or of applicable law.' },
        { type: 'p', text: 'Personal information you give us, including through the contact form, is handled as described in our [privacy policy](privacy).' },
      ],
    },
    {
      id: 'who-may-use',
      title: '4. Who may use the Services',
      short: 'You must be an adult, acting lawfully, and not a bot.',
      blocks: [
        { type: 'p', text: 'By using the Services you represent and warrant that: (1) you have the legal capacity to agree to these terms and you agree to comply with them; (2) you are not a minor where you live; (3) you will not access the Services through automated or non-human means, whether a bot, a script or otherwise; (4) you will not use the Services for any illegal or unauthorized purpose; and (5) your use of the Services will not violate any applicable law or regulation.' },
        { type: 'p', text: 'If you give us information that is untrue, inaccurate, out of date or incomplete, we may refuse any current or future use of the Services, or any part of them.' },
      ],
    },
    {
      id: 'prohibited-uses',
      title: '5. Prohibited uses',
      short: 'Use the site for what it is for: learning about our work and getting in touch.',
      blocks: [
        { type: 'p', text: 'You may use the Services only for the purpose we make them available. The Services may not be used in connection with any commercial endeavor except those we specifically endorse or approve. As a user of the Services, you agree not to:' },
        {
          type: 'ul',
          items: [
            'systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database or directory without our written permission;',
            'trick, defraud or mislead us or other users, especially in any attempt to learn sensitive account information such as passwords;',
            'circumvent, disable or otherwise interfere with security-related features of the Services, including features that prevent or restrict the use or copying of Content or enforce limits on the use of the Services;',
            'disparage, tarnish or otherwise harm, in our opinion, us or the Services;',
            'use information obtained from the Services to harass, abuse or harm another person;',
            'make improper use of our support services or submit false reports of abuse or misconduct;',
            'use the Services in a manner inconsistent with any applicable law or regulation;',
            'engage in unauthorized framing of or linking to the Services;',
            'upload or transmit, or attempt to, viruses, Trojan horses or other material that interferes with anyone\'s uninterrupted use of the Services or modifies, impairs, disrupts, alters or interferes with their use, features, functions, operation or maintenance, including excessive use of capital letters and spamming;',
            'engage in any automated use of the system, such as scripts to send comments or messages, or data mining, robots or similar data gathering and extraction tools;',
            'delete the copyright or other proprietary rights notice from any Content;',
            'impersonate another user or person;',
            'upload or transmit, or attempt to, any material that acts as a passive or active information collection or transmission mechanism, including clear GIFs, 1x1 pixels, web bugs, cookies or similar devices (sometimes called spyware or passive collection mechanisms);',
            'interfere with, disrupt or create an undue burden on the Services or the networks or services connected to them;',
            'harass, annoy, intimidate or threaten any of our employees or agents engaged in providing any part of the Services to you;',
            'attempt to bypass any measures of the Services designed to prevent or restrict access to the Services or any part of them;',
            'copy or adapt the Services\' software, including HTML, JavaScript or other code;',
            'decipher, decompile, disassemble or reverse engineer any of the software that makes up the Services, except as permitted by applicable law;',
            'use, launch, develop or distribute any automated system that accesses the Services, including any spider, robot, cheat utility, scraper or offline reader, or launch any unauthorized script or other software, except as a result of standard search engine or browser use;',
            'collect user names or email addresses by electronic or other means to send unsolicited email, or create accounts by automated means or under false pretenses; or',
            'use the Services as part of any effort to compete with us, or otherwise use the Services or the Content for any revenue-generating endeavor or commercial enterprise.',
          ],
        },
      ],
    },
    {
      id: 'third-party',
      title: '6. Other websites and content',
      short: 'Links to other sites, including filmtwist.com and the schools we feature, take you off this site and outside these terms.',
      blocks: [
        { type: 'p', text: 'The Services may contain links to other websites ("Third-Party Websites") and articles, photographs, text, graphics, pictures, designs, music, sound, video, information, applications, software and other content belonging to or originating from third parties ("Third-Party Content"). We do not investigate, monitor or check Third-Party Websites or Third-Party Content for accuracy, appropriateness or completeness, and we are not responsible for them, including their content, accuracy, offensiveness, opinions, reliability, privacy practices or other policies. Linking to or permitting the use of a Third-Party Website or Third-Party Content does not imply our approval or endorsement.' },
        { type: 'p', text: 'If you leave the Services to visit a Third-Party Website or use Third-Party Content, you do so at your own risk, and these terms no longer govern. Review the terms and policies, including privacy and data-gathering practices, of any website you go to from the Services. Any purchase you make through a Third-Party Website is between you and that company; we take no responsibility for it. You agree that we do not endorse the products or services offered on Third-Party Websites, and you hold us blameless from any harm caused by such a purchase, and from any loss or harm relating to Third-Party Content or contact with Third-Party Websites.' },
      ],
    },
    {
      id: 'management',
      title: '7. Managing the Services',
      short: 'We may monitor the site and act on misuse.',
      blocks: [
        { type: 'p', text: 'We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these terms, including reporting them to law enforcement; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of or disable, to the extent technologically feasible, anything you submit; (4) in our sole discretion and without limitation, notice or liability, remove from the Services or disable files and content that are excessive in size or otherwise burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and keep the Services working properly.' },
      ],
    },
    {
      id: 'privacy',
      title: '8. Privacy',
      short: 'Our privacy policy is part of these terms. The Services are hosted in the United States.',
      blocks: [
        { type: 'p', text: 'We care about data privacy and security. Please review our [privacy policy](privacy). By using the Services you agree to be bound by it; it is incorporated into these terms. The Services are hosted in the United States. If you access them from a region with laws governing personal data collection, use or disclosure that differ from United States law, then by continuing to use the Services you are transferring your data to the United States, and you expressly consent to having it transferred to and processed there.' },
      ],
    },
    {
      id: 'termination',
      title: '9. Term and termination',
      short: 'We can refuse the Services to anyone who breaks these terms.',
      blocks: [
        { type: 'p', text: 'These terms remain in full force and effect while you use the Services.' },
        { type: 'notice', text: 'Without limiting any other provision of these terms, we reserve the right, in our sole discretion and without notice or liability, to deny access to and use of the Services, including by blocking certain IP addresses, to any person for any reason or for no reason, including for breach of any representation, warranty or covenant in these terms or of any applicable law or regulation. We may end your use of or participation in the Services, or delete any content or information you provided, at any time, without warning, in our sole discretion.' },
        { type: 'p', text: 'If we end or suspend your use of the Services for any reason, you may not sign up again under your own name, a fake or borrowed name, or the name of any third party, even if acting on that third party\'s behalf. We also reserve the right to take appropriate legal action, including pursuing civil, criminal and injunctive remedies.' },
      ],
    },
    {
      id: 'changes',
      title: '10. Changes and interruptions',
      short: 'The site may change or be unavailable at times. We are not liable for that.',
      blocks: [
        { type: 'p', text: 'We may change, modify or remove the contents of the Services at any time, for any reason, at our sole discretion and without notice. We have no obligation to update any information on the Services. We will not be liable to you or any third party for any modification, price change, suspension or discontinuance of the Services.' },
        { type: 'p', text: 'We cannot guarantee that the Services will be available at all times. Hardware, software or other problems, or maintenance, may cause interruptions, delays or errors. We may change, revise, update, suspend, discontinue or otherwise modify the Services at any time, for any reason, without notice. You agree that we have no liability for any loss, damage or inconvenience caused by your inability to access or use the Services during any downtime or discontinuance. Nothing in these terms obligates us to maintain and support the Services or to supply corrections, updates or releases for them.' },
      ],
    },
    {
      id: 'governing-law',
      title: '11. Governing law',
      short: 'California law applies.',
      blocks: [
        { type: 'p', text: 'These terms and your use of the Services are governed by and construed under the laws of the State of California applicable to agreements made and performed entirely within California, without regard to its conflict of law principles.' },
      ],
    },
    {
      id: 'disputes',
      title: '12. Dispute resolution',
      short: 'Talk first, for at least 30 days. Then binding arbitration, one dispute at a time, with no class actions.',
      blocks: [
        { type: 'h3', text: 'Informal negotiation' },
        { type: 'p', text: 'To speed up resolution and control the cost of any dispute, controversy or claim related to these terms (a "Dispute") brought by either you or us (each a "Party"), the Parties agree to first try to negotiate the Dispute informally, except for the Disputes listed under "Exceptions" below, for at least 30 days before starting arbitration. Informal negotiation begins on written notice from one Party to the other.' },
        { type: 'h3', text: 'Binding arbitration' },
        { type: 'p', text: 'Any Dispute arising out of or in connection with these terms, including any question about their existence, validity or termination, shall be referred to and finally resolved by binding arbitration before a single arbitrator, administered by a recognized arbitration provider in the United States under its commercial arbitration rules, which by this reference form part of this clause. The seat of the arbitration is Contra Costa County, California. The language of the proceedings is English. The governing law of these terms is the law of the State of California.' },
        { type: 'h3', text: 'Restrictions' },
        { type: 'p', text: 'The Parties agree that any arbitration is limited to the Dispute between the Parties individually. To the fullest extent permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any Dispute to be arbitrated on a class-action basis or using class action procedures; and (c) there is no right or authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other persons.' },
        { type: 'h3', text: 'Exceptions' },
        { type: 'p', text: 'The following Disputes are not subject to the provisions above on informal negotiation and binding arbitration: (a) any Dispute seeking to enforce or protect, or concerning the validity of, a Party\'s intellectual property rights; (b) any Dispute related to, or arising from, allegations of theft, piracy, invasion of privacy or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to be illegal or unenforceable, neither Party will elect to arbitrate any Dispute falling within the portion found illegal or unenforceable, and that Dispute shall be decided by a court of competent jurisdiction in Contra Costa County, California, and the Parties agree to submit to the personal jurisdiction of that court.' },
      ],
    },
    {
      id: 'corrections',
      title: '13. Corrections',
      short: 'We fix mistakes on the site when we find them.',
      blocks: [
        { type: 'p', text: 'The Services may contain typographical errors, inaccuracies or omissions, including in descriptions, pricing, availability and other information. We reserve the right to correct any errors, inaccuracies or omissions and to change or update the information on the Services at any time, without prior notice.' },
      ],
    },
    {
      id: 'disclaimer',
      title: '14. Disclaimer',
      short: 'The site is provided as is, and you use it at your own risk.',
      blocks: [
        { type: 'notice', text: 'The Services are provided on an as-is and as-available basis. You agree that your use of the Services is at your sole risk. To the fullest extent permitted by law, we disclaim all warranties, express or implied, in connection with the Services and your use of them, including the implied warranties of merchantability, fitness for a particular purpose and non-infringement. We make no warranties or representations about the accuracy or completeness of the Services\' content or the content of any websites or mobile applications linked to the Services, and we assume no liability or responsibility for (1) errors, mistakes or inaccuracies of content and materials; (2) personal injury or property damage of any nature resulting from your access to and use of the Services; (3) any unauthorized access to or use of our secure servers or any personal or financial information stored on them; (4) any interruption or cessation of transmission to or from the Services; (5) any bugs, viruses, Trojan horses or the like that may be transmitted to or through the Services by any third party; or (6) any errors or omissions in any content and materials, or any loss or damage of any kind incurred as a result of the use of any content posted, transmitted or otherwise made available through the Services.' },
        { type: 'notice', text: 'We do not warrant, endorse, guarantee or assume responsibility for any product or service advertised or offered by a third party through the Services, any hyperlinked website, or any website or mobile application featured in any banner or other advertising, and we will not be a party to or in any way responsible for monitoring any transaction between you and any third-party provider of products or services. As with the purchase of a product or service through any medium or in any environment, use your best judgment and exercise caution where appropriate.' },
      ],
    },
    {
      id: 'liability',
      title: '15. Limitation of liability',
      short: 'Our liability to you is capped at what you have paid us.',
      blocks: [
        { type: 'notice', text: 'In no event will we or our directors, employees or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special or punitive damages, including lost profit, lost revenue, loss of data or other damages arising from your use of the Services, even if we have been advised of the possibility of such damages. Notwithstanding anything to the contrary in these terms, our liability to you for any cause whatsoever, and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us.' },
        { type: 'p', text: 'Certain US state laws and international laws do not allow limitations on implied warranties or the exclusion or limitation of certain damages. If these laws apply to you, some or all of the disclaimers or limitations above may not apply to you, and you may have additional rights.' },
      ],
    },
    {
      id: 'indemnification',
      title: '16. Indemnification',
      short: 'If your misuse of the site leads to a claim against us, you cover it.',
      blocks: [
        { type: 'p', text: 'You agree to defend, indemnify and hold us harmless, including our subsidiaries, affiliates and all of our respective officers, agents, partners and employees, from and against any loss, damage, liability, claim or demand, including reasonable attorneys\' fees and expenses, made by any third party due to or arising out of: (1) your use of the Services; (2) your breach of these terms; (3) any breach of your representations and warranties in these terms; (4) your violation of the rights of a third party, including intellectual property rights; or (5) any overt harmful act toward any other user of the Services with whom you connected through the Services.' },
        { type: 'p', text: 'We reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action or proceeding once we become aware of it.' },
      ],
    },
    {
      id: 'user-data',
      title: '17. Your data on the Services',
      short: 'Keep your own copy of anything you send us.',
      blocks: [
        { type: 'p', text: 'We maintain certain data that you transmit to the Services to manage their performance, as well as data about your use of the Services. Although we perform regular routine backups, you are solely responsible for all data you transmit or that relates to any activity you undertake using the Services. You agree that we have no liability to you for any loss or corruption of such data, and you waive any right of action against us arising from it.' },
      ],
    },
    {
      id: 'electronic',
      title: '18. Electronic communications and signatures',
      short: 'Email, this site and its contact form count as writing.',
      blocks: [
        { type: 'p', text: 'Visiting the Services, sending us email and completing online forms are electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures and other communications we provide to you electronically, by email and on the Services, satisfy any legal requirement that such communication be in writing. You agree to the use of electronic signatures, contracts, orders and other records, and to electronic delivery of notices, policies and records of transactions initiated or completed by us or through the Services. You waive any rights or requirements under any statute, regulation, rule, ordinance or other law in any jurisdiction that require an original signature, or delivery or retention of non-electronic records, or payments or the granting of credits by any means other than electronic means.' },
      ],
    },
    {
      id: 'text-messages',
      title: '19. Text messages',
      short: 'If you give us your phone number on the form, we may text you about your inquiry. Reply STOP to stop.',
      blocks: [
        { type: 'p', text: 'When you provide your phone number through our contact form, you agree to receive text messages from us, as the form states.' },
        { type: 'h3', text: 'Opting out' },
        { type: 'p', text: 'If at any time you wish to stop receiving text messages from us, reply to the text with "STOP". You may receive one message confirming your opt-out.' },
        { type: 'h3', text: 'Message and data rates' },
        { type: 'p', text: 'Message and data rates may apply to text messages sent or received. Your carrier and your mobile plan determine the rates.' },
        { type: 'h3', text: 'Support' },
        { type: 'p', text: `If you have questions or need help with our text messages, email ${EMAIL} or call ${PHONE}.` },
      ],
    },
    {
      id: 'california',
      title: '20. California residents',
      short: 'Where to take a complaint we have not resolved.',
      blocks: [
        { type: 'p', text: 'If a complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834, or by telephone at (800) 952-5210 or (916) 445-1254.' },
      ],
    },
    {
      id: 'general',
      title: '21. General terms',
      short: 'The whole agreement, severability, assignment and no partnership.',
      blocks: [
        { type: 'p', text: 'These terms and any policies or operating rules we post on or about the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these terms is not a waiver of that right or provision. These terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time. We are not responsible or liable for any loss, damage, delay or failure to act caused by anything beyond our reasonable control.' },
        { type: 'p', text: 'If any provision or part of a provision of these terms is found to be unlawful, void or unenforceable, that provision or part is severable from these terms and does not affect the validity and enforceability of the rest. No joint venture, partnership, employment or agency relationship is created between you and us by these terms or your use of the Services. You agree that these terms will not be construed against us because we drafted them. You waive any defenses you may have based on the electronic form of these terms and the lack of signing by the parties.' },
      ],
    },
    {
      id: 'contact',
      title: '22. Contact us',
      short: 'To resolve a complaint about the Services or ask about using them.',
      blocks: [{ type: 'contact' }],
    },
  ],
};

export const privacy: LegalDoc = {
  id: 'privacy',
  title: 'Privacy policy',
  description: `What ${L.dba} collects when you use ${L.siteHost}, why, who sees it and what you can do about it.`,
  updated: L.updated,
  lede: `What we collect when you use this website, why, who sees it, and what you can do about it. The short line under each heading is a summary. The text below it is what applies.`,
  intro: [
    {
      type: 'p',
      text: `This privacy notice for ${L.entity}, doing business as ${L.dba} ("Filmtwist", "we", "us", "our"), describes how and why we might collect, store, use and share ("process") your information when you use our services ("Services"), such as when you visit our website at ${L.siteHost}, or any website of ours that links to this notice, or engage with us in other related ways, including sales, marketing or events. Full School Marketing is Filmtwist's K-12 school enrollment practice.`,
    },
    {
      type: 'p',
      text: `Reading this notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have questions or concerns, contact us at ${EMAIL}.`,
    },
    { type: 'h3', text: 'In short' },
    {
      type: 'ul',
      items: [
        '**What we process:** the contact details and school information you type into our form, and the technical information any website records. We do not process sensitive personal information, and we do not receive information about you from third parties.',
        '**Why:** to answer your inquiry, provide our services, communicate with you, keep the site secure and comply with the law. Anything else only with your consent.',
        '**Who sees it:** the service providers who run our form, email and hosting, under contract. We do not sell personal information and do not share it for advertising.',
        `**Your rights:** depending on where you live, you can ask to see, correct or delete your information, or withdraw consent, by writing to ${EMAIL}.`,
      ],
    },
  ],
  sections: [
    {
      id: 'collect',
      title: 'What information do we collect?',
      short: 'What you type into the contact form, plus the technical data any website records.',
      blocks: [
        { type: 'h3', text: 'Information you give us' },
        { type: 'p', text: 'We collect personal information that you voluntarily provide when you express an interest in our services, take part in activities on the Services, or otherwise contact us. Through the contact form on this site, that is:' },
        {
          type: 'ul',
          items: [
            'your name, email address and phone number;',
            'the service you are asking about, how you heard about us, and your budget range;',
            'what you tell us about your school or organization and what you need.',
          ],
        },
        { type: 'p', text: 'All personal information you provide must be true, complete and accurate, and you must tell us of any changes.' },
        { type: 'h3', text: 'Sensitive information' },
        { type: 'p', text: 'We do not process sensitive information.' },
        { type: 'h3', text: 'Information collected automatically' },
        { type: 'p', text: 'Some information, such as your Internet Protocol (IP) address and browser and device characteristics, is collected automatically when you visit the Services. It does not reveal your specific identity, such as your name or contact details, but may include device and usage information: your IP address, browser and device characteristics, operating system, language preferences, referring URLs, country, and information about how and when you use the Services. We need it mainly to keep the Services secure and running, and for our internal reporting. It includes:' },
        {
          type: 'ul',
          items: [
            '**Log and usage data.** Service-related, diagnostic, usage and performance information our servers record automatically when you use the Services, such as your IP address, device and browser type, the pages and files viewed, the date and time, and error reports.',
            '**Device data.** Information about the computer, phone, tablet or other device you use, such as its IP address, browser type, operating system and system configuration. An approximate location may be inferred from your IP address.',
          ],
        },
        { type: 'p', text: 'This site stores a small flag in your browser so that its opening animation plays once per visit. It sets no analytics or advertising cookies.' },
      ],
    },
    {
      id: 'process',
      title: 'How do we process your information?',
      short: 'To respond to you and provide our services, to keep the site secure, and to comply with the law.',
      blocks: [
        { type: 'p', text: 'We process your personal information for a variety of reasons, depending on how you interact with our Services, including:' },
        {
          type: 'ul',
          items: [
            '**To deliver and facilitate delivery of services to you.** We may process your information to respond to your inquiry and provide the service you requested.',
            '**To communicate with you.** By email and, if you gave us your phone number and agreed to it on the form, by text message, about your inquiry and our work together.',
            '**To keep the Services secure** and to prevent fraud.',
            '**To comply with the law.**',
            '**To save or protect an individual\'s vital interest,** such as to prevent harm.',
            '**For other purposes with your consent.**',
          ],
        },
      ],
    },
    {
      id: 'legal-bases',
      title: 'What legal bases do we rely on to process your information?',
      short: 'Your consent, a contract with you, our legal obligations, or someone\'s vital interests.',
      blocks: [
        { type: 'p', text: 'We only process your personal information when we believe it is necessary and we have a valid legal reason to do so under applicable law: with your consent, to comply with laws, to provide you with services or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.' },
        { type: 'h3', text: 'If you are in the EU or UK' },
        { type: 'p', text: 'The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on. We may rely on:' },
        {
          type: 'ul',
          items: [
            '**Consent.** We may process your information if you have given us permission to use your personal information for a specific purpose. You can withdraw your consent at any time (see "What are your privacy rights?").',
            '**Performance of a contract.** We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you, including providing our Services, or at your request before entering into a contract with you.',
            '**Legal obligations.** We may process your information where we believe it is necessary to comply with our legal obligations, such as to cooperate with a law enforcement body or regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation we are involved in.',
            '**Vital interests.** We may process your information where we believe it is necessary to protect your vital interests or those of a third party, such as situations involving potential threats to the safety of any person.',
          ],
        },
        { type: 'h3', text: 'If you are in Canada' },
        { type: 'p', text: 'We may process your information if you have given us specific permission (express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (implied consent). You can withdraw your consent at any time.' },
        { type: 'p', text: 'In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, for example:' },
        {
          type: 'ul',
          items: [
            'if collection is clearly in the interests of an individual and consent cannot be obtained in a timely way;',
            'for investigations and fraud detection and prevention;',
            'for business transactions, provided certain conditions are met;',
            'if it is contained in a witness statement and the collection is necessary to assess, process or settle an insurance claim;',
            'for identifying injured, ill or deceased persons and communicating with next of kin;',
            'if we have reasonable grounds to believe an individual has been, is or may be a victim of financial abuse;',
            'if it is reasonable to expect that collection and use with consent would compromise the availability or accuracy of the information, and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province;',
            'if disclosure is required to comply with a subpoena, warrant, court order or rules of the court relating to the production of records;',
            'if it was produced by an individual in the course of their employment, business or profession and the collection is consistent with the purposes for which the information was produced;',
            'if the collection is solely for journalistic, artistic or literary purposes; or',
            'if the information is publicly available and is specified by the regulations.',
          ],
        },
      ],
    },
    {
      id: 'share',
      title: 'When and with whom do we share your personal information?',
      short: 'With the companies that run our form, email and hosting, under contract, and in a sale of the business. Never sold.',
      blocks: [
        { type: 'p', text: 'We may need to share your personal information in the following situations:' },
        {
          type: 'ul',
          items: [
            '**Service providers.** Companies that process information on our behalf under a written contract and may use it only as we instruct: the forms and customer-relationship platform that receives what you submit through our contact form, our email provider, and our website host.',
            '**Business transfers.** We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing or acquisition of all or a portion of our business by another company.',
            '**Legal requirements.** Where we believe it is necessary to comply with the law, a court order or a lawful request, or to protect our rights, your safety or the safety of others.',
          ],
        },
        { type: 'p', text: 'This site does not currently use Google Analytics or any other analytics service. If we add one, we will update this notice and say how to opt out.' },
      ],
    },
    {
      id: 'retention',
      title: 'How long do we keep your information?',
      short: 'As long as we need it for the purposes in this notice, unless the law requires longer.',
      blocks: [
        { type: 'p', text: 'We keep your personal information only as long as it is necessary for the purposes set out in this notice, unless a longer retention period is required or permitted by law, such as tax, accounting or other legal requirements.' },
        { type: 'p', text: 'When we have no ongoing legitimate business need to process your personal information, we will delete or anonymize it. If that is not possible, for example because it is held in backup archives, we will store it securely and isolate it from further processing until deletion is possible.' },
      ],
    },
    {
      id: 'security',
      title: 'How do we keep your information safe?',
      short: 'Reasonable technical and organizational measures. No transmission over the internet is fully secure.',
      blocks: [
        { type: 'p', text: 'We have implemented appropriate and reasonable technical and organizational security measures designed to protect the personal information we process. However, no electronic transmission over the internet or information storage technology can be guaranteed to be completely secure, so we cannot promise that hackers, cybercriminals or other unauthorized third parties will not defeat our security and improperly collect, access, steal or modify your information. We will do our best to protect your personal information, but transmission of personal information to and from our Services is at your own risk. Access the Services only within a secure environment.' },
      ],
    },
    {
      id: 'minors',
      title: 'Do we collect information from minors?',
      short: 'No. This site is for adults who work at or with schools.',
      blocks: [
        { type: 'p', text: `We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18, or that you are the parent or guardian of a minor and consent to that minor's use of the Services. If we learn that we have collected personal information from anyone under 18, we will take reasonable measures to delete it promptly. If you become aware of any data we may have collected from a child under 18, contact us at ${EMAIL}.` },
      ],
    },
    {
      id: 'rights',
      title: 'What are your privacy rights?',
      short: 'Ask to see, correct or delete your information, or withdraw consent, by writing to us.',
      blocks: [
        { type: 'p', text: 'In some regions, such as the European Economic Area (EEA), the United Kingdom (UK), Switzerland and Canada, you have rights under applicable data protection laws. These may include the right (i) to request access to and a copy of your personal information, (ii) to request correction or erasure, (iii) to restrict the processing of your personal information, (iv) if applicable, to data portability, and (v) not to be subject to automated decision-making. In certain circumstances you may also have the right to object to the processing of your personal information. Make a request using the contact details in "How can you contact us about this notice?" below. We will consider and act on any request in accordance with applicable data protection laws.' },
        { type: 'p', text: 'If you are in the EEA or UK and believe we are unlawfully processing your personal information, you also have the right to complain to your Member State data protection authority or the UK data protection authority. If you are in Switzerland, you may contact the Federal Data Protection and Information Commissioner.' },
        { type: 'h3', text: 'Withdrawing your consent' },
        { type: 'p', text: 'If we rely on your consent to process your personal information, which may be express or implied depending on the applicable law, you have the right to withdraw it at any time, using the contact details below. Withdrawing consent does not affect the lawfulness of processing before the withdrawal, nor, where the law allows, processing conducted on lawful grounds other than consent.' },
        { type: 'h3', text: 'Opting out of marketing' },
        { type: 'p', text: 'You can unsubscribe from our marketing and promotional communications at any time by clicking the unsubscribe link in an email we send, replying "STOP" or "UNSUBSCRIBE" to a text message we send, or contacting us using the details below. You will then be removed from the marketing lists. We may still send you service-related messages, such as a reply to your inquiry or other non-marketing communication.' },
        { type: 'p', text: `If you have questions or comments about your privacy rights, email ${EMAIL}.` },
      ],
    },
    {
      id: 'do-not-track',
      title: 'Controls for do-not-track features',
      short: 'There is no standard yet, so we do not respond to these browser signals.',
      blocks: [
        { type: 'p', text: 'Most web browsers and some mobile operating systems and applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal that you do not want data about your online browsing monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. We therefore do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard is adopted that we must follow, we will tell you about that practice in a revised version of this notice.' },
      ],
    },
    {
      id: 'us-residents',
      title: 'Do US residents have specific privacy rights?',
      short: 'California residents can ask what we hold, have it corrected or deleted, and will not be treated differently for asking.',
      blocks: [
        { type: 'h3', text: 'What categories of personal information do we collect?' },
        { type: 'p', text: 'Through this website, we have collected the following categories of personal information in the past twelve months:' },
        {
          type: 'ul',
          items: [
            '**Identifiers:** name, email address, phone number and IP address.',
            '**Personal information as defined in the California Customer Records statute:** name and contact information.',
            '**Commercial information:** the budget range you give us for the services you ask about.',
            '**Internet or other similar network activity:** server logs of your visit, as described above.',
            '**Professional or employment-related information:** the school or organization you work with and your role, when you tell us.',
          ],
        },
        { type: 'p', text: 'We do not collect protected classification characteristics, biometric information, precise geolocation data, education information, inferences drawn to build a profile about you, or sensitive personal information through this website. We may also collect other personal information outside these categories when you interact with us in person, online, by phone or by mail, in the context of receiving help through our support channels, taking part in customer surveys, or our delivering services and responding to your inquiries.' },
        { type: 'p', text: 'We keep identifiers for six months after your inquiry, and other categories for as long as needed to provide the Services, as described in "How long do we keep your information?".' },
        { type: 'h3', text: 'How do we use and share your personal information?' },
        { type: 'p', text: 'Our uses are described in "How do we process your information?" and our sharing in "When and with whom do we share your personal information?". We may disclose your personal information to our service providers under a written contract. We may use it for our own business purposes, such as internal research for technological development and demonstration; that is not considered "selling". We have not sold or shared personal information with third parties for a business or commercial purpose in the preceding twelve months, and we will not sell or share the personal information of website visitors, users and other consumers in the future.' },
        { type: 'h3', text: 'Shine the Light' },
        { type: 'p', text: 'California Civil Code Section 1798.83, the "Shine the Light" law, permits California residents to request from us, once a year and free of charge, information about the categories of personal information, if any, we disclosed to third parties for direct marketing purposes, and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. To make such a request, write to us using the contact details below.' },
        { type: 'h3', text: 'Your rights under the California Consumer Privacy Act (CCPA)' },
        { type: 'p', text: 'This section applies only to California residents. The California Code of Regulations defines a resident as (1) every individual who is in the State of California for other than a temporary or transitory purpose, and (2) every individual who is domiciled in California but is outside the state for a temporary or transitory purpose. All other individuals are non-residents. If this definition applies to you, we must honor certain rights and obligations regarding your personal information.' },
        {
          type: 'ul',
          items: [
            '**Right to request deletion.** You can ask us to delete your personal information. We will respect your request and delete it, subject to exceptions provided by law, such as another consumer\'s exercise of their right to free speech, our compliance with a legal obligation, or processing needed to protect against illegal activity.',
            '**Right to know.** Depending on the circumstances, you have a right to know whether we collect and use your personal information; the categories we collect; the purposes we use them for; whether we sell or share personal information with third parties; the categories of personal information we sold, shared or disclosed for a business purpose; the categories of third parties involved; the business or commercial purpose for collecting, selling or sharing personal information; and the specific pieces of personal information we collected about you. We are not obligated to provide or delete consumer information that is de-identified in response to a request, or to re-identify individual data to verify a request.',
            '**Right to non-discrimination.** We will not discriminate against you for exercising your privacy rights.',
            '**Right to limit use and disclosure of sensitive personal information.** We do not process consumers\' sensitive personal information.',
            '**Right to correct and to object.** You may request correction of personal data that is incorrect or no longer relevant, ask us to restrict its processing, or object to its processing.',
            '**Right to opt out.** You may ask to opt out of any future selling or sharing of your personal information. We will act on an opt-out request as soon as feasibly possible, and no later than fifteen (15) days from the date it is submitted.',
            '**Authorized agents.** You can designate an authorized agent to make a request under the CCPA on your behalf. We may deny a request from an agent who does not submit proof of valid authorization to act for you in accordance with the CCPA.',
          ],
        },
        { type: 'h3', text: 'Verification' },
        { type: 'p', text: 'When we receive your request, we need to verify your identity to confirm you are the person whose information we hold. We may ask you for information we can match against what you previously gave us, or contact you through a method, such as phone or email, that you previously provided. We may use other verification methods as the circumstances require. We use the information in your request only to verify your identity or authority to make the request, and we avoid asking for more than needed. If we cannot verify you from the information we already hold, we may ask for more, for verification and for security or fraud prevention, and we delete it as soon as we finish verifying you.' },
        { type: 'p', text: `To exercise these rights, email ${EMAIL} with "Privacy request" in the subject line, or write to the address at the bottom of this notice. If you have a complaint about how we handle your data, we would like to hear from you.` },
      ],
    },
    {
      id: 'updates',
      title: 'Do we make updates to this notice?',
      short: 'Yes, as needed to stay compliant with the law. The date at the top shows the latest version.',
      blocks: [
        { type: 'p', text: 'We may update this privacy notice from time to time. The updated version will carry a new "Last updated" date and will take effect as soon as it is accessible. If we make material changes, we may notify you by prominently posting a notice of the changes or by sending you a notification directly. Review this notice frequently to stay informed about how we protect your information.' },
      ],
    },
    {
      id: 'contact',
      title: 'How can you contact us about this notice?',
      short: 'By email or by post.',
      blocks: [{ type: 'contact' }],
    },
    {
      id: 'review',
      title: 'How can you review, update or delete the data we collect from you?',
      short: 'Email us. We will act as the applicable data protection law requires.',
      blocks: [
        { type: 'p', text: `You have the right to request access to the personal information we collect from you, to change it, or to delete it. To review, update or delete your personal information, email ${EMAIL} with "Privacy request" in the subject line.` },
      ],
    },
  ],
};

export const legalDocs: Record<LegalDoc['id'], LegalDoc> = { terms, privacy };
