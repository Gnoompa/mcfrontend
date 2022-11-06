import React from 'react';

export const LandPinIcon = ({
  className,
  fill = '#34FF61',
  stroke = '#34FF61'
}: {
  className?: string;
  fill?: string;
  stroke?: string;
}) => {
  return (
    <svg
      className={className ?? ''}
      width="17"
      height="26"
      viewBox="0 0 17 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.37508 23.0015L8.49999 23.1894L8.62492 23.0015C8.9092 22.5738 9.24824 22.0636 9.61572 21.4974C10.9241 21.5834 11.8753 21.819 12.4772 22.1165C13.1058 22.4273 13.2907 22.7672 13.2301 23.0381C13.1976 23.1834 13.0917 23.344 12.884 23.5058C12.677 23.6671 12.3783 23.8219 11.9823 23.9562C11.1905 24.2248 10.0316 24.4041 8.5 24.4041C6.97588 24.4041 5.82261 24.2248 5.03504 23.9563C4.64114 23.822 4.34429 23.6673 4.13875 23.5061C3.9326 23.3444 3.8277 23.184 3.79594 23.0388C3.73659 22.7675 3.92283 22.4273 4.55192 22.1165C5.15424 21.819 6.1055 21.5835 7.41378 21.4974C7.56634 21.7339 7.71093 21.9628 7.84842 22.1805C8.03649 22.4783 8.21128 22.7551 8.37508 23.0015ZM16.15 8.52412C16.15 4.27826 12.7336 0.85 8.5 0.85C4.29655 0.85 0.85 4.27773 0.85 8.52412C0.85 10.262 1.79541 12.4634 3.03309 14.6754C4.12493 16.6267 5.45807 18.6094 6.60943 20.3217C6.71814 20.4834 6.82524 20.6427 6.93036 20.7993C5.59988 20.9338 4.60313 21.2386 3.94912 21.6347C3.25773 22.0534 2.91314 22.6024 3.04357 23.1746C3.16991 23.7288 3.72824 24.2198 4.62737 24.5701C5.53529 24.9237 6.82806 25.15 8.5 25.15C10.1793 25.15 11.4757 24.9237 12.385 24.5701C13.2855 24.2199 13.8433 23.7288 13.9677 23.174C14.0959 22.6017 13.7482 22.053 13.0548 21.6346C12.399 21.2387 11.4011 20.934 10.0711 20.7995C10.1129 20.7379 10.155 20.6759 10.1973 20.6135C11.4033 18.8365 12.827 16.7386 13.978 14.6753C15.2122 12.4631 16.15 10.2618 16.15 8.52412ZM1.59434 8.52457C1.59434 4.71072 4.69977 1.59622 8.5 1.59622C12.3296 1.59622 15.4057 4.71053 15.4057 8.52457C15.4057 9.43999 15.1102 10.5228 14.6232 11.6943C14.137 12.8638 13.4648 14.1106 12.7218 15.351C11.79 16.9065 10.7564 18.4377 9.84221 19.792C9.34835 20.5236 8.88933 21.2036 8.5 21.808C8.11067 21.2036 7.65166 20.5236 7.15783 19.7921C6.24355 18.4377 5.20991 16.9065 4.27814 15.3509C3.53515 14.1105 2.86292 12.8637 2.37678 11.6943C1.88977 10.5227 1.59434 9.43998 1.59434 8.52457ZM12.6817 8.52439C12.6817 6.21153 10.8066 4.32971 8.5 4.32971C6.19338 4.32971 4.31829 6.21153 4.31829 8.52439C4.31829 10.8373 6.19338 12.7191 8.5 12.7191C10.8066 12.7191 12.6817 10.8373 12.6817 8.52439ZM5.09258 8.52439C5.09258 6.64391 6.62671 5.10553 8.5 5.10553C10.4037 5.10553 11.937 6.64471 11.937 8.52439C11.937 10.4346 10.4029 11.9729 8.5 11.9729C6.62752 11.9729 5.09258 10.4354 5.09258 8.52439Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="0.3"
      />
    </svg>
  );
};
