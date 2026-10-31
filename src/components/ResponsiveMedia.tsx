import type { CSSProperties } from 'react';
import type { MediaAsset } from '../content/media';

interface Props {
  asset: MediaAsset;
  sizes?: string;
  priority?: boolean;
  /** Load at once even when off screen (a marquee tile that slides into view would otherwise arrive blank). */
  eager?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Override alt (e.g. empty for decorative duplicates) */
  alt?: string;
}

/** <picture> with WebP + JPEG fallback, intrinsic size reserved to prevent layout shift. */
export function ResponsiveMedia({ asset, sizes = '(max-width: 700px) 100vw, 50vw', priority = false, eager = false, className, style, alt }: Props) {
  return (
    <picture className={className} style={style}>
      <source type="image/webp" srcSet={asset.srcSet} sizes={sizes} />
      <img
        src={asset.fallback}
        width={asset.width}
        height={asset.height}
        alt={alt ?? asset.alt}
        loading={priority || eager ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  );
}
