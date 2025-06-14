import React from "react";

interface ISectionHeaderProps {
  children?: React.ReactNode;

  headingText: string;
}

function SectionHeader({ headingText, children }: ISectionHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 items-center">
        <div className="min-h-[2.5rem] lg:min-h-[3rem] min-w-3 lg:min-w-6  rounded-sm bg-[#27187E]"></div>
        <span className="lg:text-[18px] text-[#27187E] font-semibold">
          {headingText}
        </span>
      </div>

      {children}
    </div>
  );
}

export default SectionHeader;
