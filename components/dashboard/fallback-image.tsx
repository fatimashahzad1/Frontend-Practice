import { useEffect, useState } from 'react';
import Image from 'next/image';

interface FallbackImageProps {
  readonly src?: string | null;
  readonly fallbackSrc: string;
  readonly alt: string;
  readonly className: string;
  readonly width?: number;
  readonly height?: number;
  readonly layout?: string;
  readonly objectFit?: string;
}

export default function FallbackImage({
  src,
  fallbackSrc,
  alt,
  className,
  ...props
}: FallbackImageProps) {
  const [source, setSource] = useState(src);
  useEffect(() => {
    if (!src) {
      setSource(fallbackSrc);
    }
  }, [src]);
  if (source) {
    return (
      <Image
        src={source}
        alt={alt}
        className={className}
        onError={() => setSource(fallbackSrc)}
        {...props}
      />
    );
  }
}
