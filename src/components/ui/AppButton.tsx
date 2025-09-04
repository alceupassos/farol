
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'premium' | 'cta' | 'hero';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  animation?: 'none' | 'pulse' | 'glow' | 'bounce' | 'float' | 'breathe';
}

const AppButton = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  loadingText,
  fullWidth = false,
  animation = 'none',
  ...props
}: AppButtonProps) => {
  const baseStyles = "btn-animated inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden shadow-lg";
  
  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/50 btn-shimmer hover:shadow-primary/25",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary/40 hover:shadow-secondary/25",
    outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground focus:ring-primary/40 hover:border-primary/50",
    ghost: "hover:bg-accent hover:text-accent-foreground focus:ring-primary/40 hover:shadow-md",
    link: "underline-offset-4 hover:underline text-primary hover:text-primary/90 focus:ring-transparent p-0 shadow-none",
    premium: "bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-xl hover:shadow-2xl btn-glow",
    cta: "bg-primary text-primary-foreground btn-pulse shadow-xl hover:shadow-primary/40 font-semibold",
    hero: "bg-gradient-to-r from-primary/90 to-secondary/90 text-white border border-white/20 hover:bg-gradient-to-r hover:from-primary hover:to-secondary shadow-xl hover:shadow-primary/30 backdrop-blur-sm"
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 h-8",
    md: "text-sm px-4 py-2 h-10",
    lg: "text-base px-6 py-3 h-12",
    xl: "text-lg px-8 py-4 h-14"
  };
  
  const animationStyles = {
    none: "",
    pulse: "btn-pulse",
    glow: "btn-glow",
    bounce: "hover:animate-button-bounce",
    float: "animate-float",
    breathe: "animate-breathe"
  };
  
  const widthStyles = fullWidth ? "w-full" : "";
  
  // Don't apply padding to link variant
  const finalSizeStyles = variant === 'link' 
    ? "text-sm" 
    : sizeStyles[size];
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        finalSizeStyles,
        widthStyles,
        animationStyles[animation],
        "disabled:opacity-50 disabled:pointer-events-none disabled:transform-none",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText || children}
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default AppButton;
