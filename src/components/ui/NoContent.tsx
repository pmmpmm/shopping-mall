interface NoContentProps {
  message: string;
}

const NoContent = ({ message }: NoContentProps) => {
  return (
    <div className="flex justify-center py-8">
      <span className="text-lg font-medium">
        <em className="not-italic text-[26px] align-top pr-3">😅</em>
        {message}
      </span>
    </div>
  );
};

export default NoContent;
