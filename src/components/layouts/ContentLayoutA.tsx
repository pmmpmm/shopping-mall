interface ContentLayoutAProps {
  children: React.ReactNode;
}

const ContentLayoutA = ({ children }: ContentLayoutAProps) => {
  return <div className="pt-12 pb-12">{children}</div>;
};

export default ContentLayoutA;
