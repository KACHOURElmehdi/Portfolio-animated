import React from 'react';
import Magnetic from '@/components/ui/Magnetic';

interface AnimatedLinkProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<any>) => void;
  className?: string;
  magnetic?: boolean;
  strength?: number;
  as?: React.ElementType;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  children,
  onClick,
  className = '',
  magnetic = true,
  strength = 0.38,
  as: Wrapper = 'li',
}) => {
  if (React.isValidElement(children) && children.type === 'a') {
    const { href, children: text, onClick: childOnClick, target, rel, className: childClassName, ...rest } = children.props as any;

    const label = typeof text === 'string' || typeof text === 'number' ? String(text) : undefined;

    const linkContent = (
      <a
        href={href}
        onClick={childOnClick || onClick}
        target={target}
        rel={rel}
        aria-label={label}
        className={`${childClassName || ''} relative z-10 group cursor-pointer inline-flex items-center min-h-11 min-w-11 px-1 py-2`.trim()}
        {...rest}
      >
        <span aria-hidden="true" className="relative overflow-hidden h-[1.25em] inline-flex items-center">
          <span
            className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full h-full flex items-center"
          >
            {text}
          </span>
          <span
            className="block absolute top-full left-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-full pointer-events-none h-full flex items-center"
          >
            {text}
          </span>
        </span>
      </a>
    );

    return (
      <Wrapper
        className={`${className} ${Wrapper === 'li' ? 'list-none' : ''}`.trim()}
        {...(Wrapper === 'li' && label ? { 'aria-label': label } : {})}
      >
        {magnetic ? (
          <Magnetic strength={strength}>
            {linkContent}
          </Magnetic>
        ) : (
          linkContent
        )}
      </Wrapper>
    );
  }

  const spanContent = (
    <span
      className="relative z-10 group cursor-pointer inline-flex items-center min-h-11 py-2"
      onClick={onClick}
    >
      <span className="relative overflow-hidden h-[1.25em] inline-flex items-center">
        <span
          className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full h-full flex items-center"
        >
          {children}
        </span>
        <span
          aria-hidden="true"
          className="block absolute top-full left-0 transition-transform duration-300 ease-in-out group-hover:-translate-y-full pointer-events-none h-full flex items-center"
        >
          {children}
        </span>
      </span>
    </span>
  );

  return (
    <Wrapper className={`${className} ${Wrapper === 'li' ? 'list-none' : ''}`.trim()}>
      {magnetic ? (
        <Magnetic strength={strength}>
          {spanContent}
        </Magnetic>
      ) : (
        spanContent
      )}
    </Wrapper>
  );
};

export default AnimatedLink;
