export function SidebarLogo() {
  return (
    <div className="w-10 h-10 flex items-center justify-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
      >
        {/* Shield with N - simplified logo for sidebar */}
        <path
          d="M16 3L6 6V16C6 21.523 10.477 26 16 26C21.523 26 26 21.523 26 16V6L16 3Z"
          fill="#1876D2"
        />
        <path
          d="M14 12V20H18V18H16V12H14Z"
          fill="white"
        />
        <path
          d="M18 12L18 14L16 14L16 16L18 16L18 18L20 18L20 16L18 16L18 14L20 14L20 12L18 12Z"
          fill="white"
        />
      </svg>
    </div>
  );
}
