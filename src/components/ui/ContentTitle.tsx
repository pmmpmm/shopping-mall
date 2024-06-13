interface ContentTitleProps {
  title: string;
}

const ContentTitle = ({ title }: ContentTitleProps) => {
  return <h2 className="pb-11 text-3xl text-center">{title}</h2>;
};

export default ContentTitle;
