import React from "react";

interface FieldFormButtonAreaProps {
  children: React.ReactNode;
}

const FieldFormButtonArea = ({ children }: FieldFormButtonAreaProps) => {
  let style = "mt-10 ";

  if ((children as React.ReactNode[]).length > 1) {
    style += "flex flex-row gap-2";
  }

  return <div className={style}>{children}</div>;
};

export default FieldFormButtonArea;
