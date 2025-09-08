interface FacebookIconProps {
  color?: string;
}

export const FacebookIcon = ({ color = "blue" }: FacebookIconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22 12C22 6.47758 17.5224 2 12 2C6.47758 2 2 6.47758 2 12C2 16.9908 5.65634 21.1281 10.4377 21.8791V14.8913H7.8979V12H10.4377V9.79635C10.4377 7.29035 11.9311 5.90517 14.2149 5.90517C15.3089 5.90517 16.4537 6.10064 16.4537 6.10064V8.56165H15.1922C13.9505 8.56165 13.5623 9.33229 13.5623 10.124V11.9999H16.3355L15.8925 14.8912H13.5623V21.879C18.3436 21.1294 21.9999 16.9922 21.9999 11.9999L22 12Z"
        fill="currentColor"
      ></path>
    </svg>
  );
};
