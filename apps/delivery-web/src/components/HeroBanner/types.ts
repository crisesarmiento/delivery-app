export interface HeroBannerProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  height?: number;
  onButtonClick?: () => void;
}
