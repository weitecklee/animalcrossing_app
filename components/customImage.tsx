import Image from 'next/image';
import { rgbDataURL } from '@/lib/functions';
import { CustomImageProps } from '@/types';

export default function CustomImage({ blurColor, ...props}: CustomImageProps) {
  const { alt } = props;

  return <Image
    {...props}
    alt={alt}
    sizes="(max-width: 600px) 50vw, (max-width: 1200px) 40vw, 30vw"
    style={{
      objectFit: 'contain',
    }}
    placeholder='blur'
    blurDataURL={rgbDataURL(blurColor)}
  />
}