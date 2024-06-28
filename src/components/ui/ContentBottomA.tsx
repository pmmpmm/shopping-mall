import React from "react";

interface ContentBottomAProps {
  children: React.ReactNode;
}

const ContentBottomA = ({ children }: ContentBottomAProps) => {
  let style = "mt-10 ";

  if ((children as React.ReactNode[]).length > 1) {
    style += "flex flex-row gap-2";
  }

  return <div className={style}>{children}</div>;
};

export default ContentBottomA;
