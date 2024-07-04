const LoadingIcon = () => {
  const square = () => {
    const result = [];
    const squareStype = "w-[10px] h-[10px] mr-[8px] mb-[8px] bg-gray-950 rounded-[3px] box-border float-left relative";
    for (let i = 0; i < 4; i++) {
      result.push(
        <div key={`loading-${i}`}>
          <div className={`${squareStype} animate-[wave_2s_ease_0s_infinite]`}></div>
          <div className={`${squareStype} animate-[wave_2s_ease_0.2s_infinite]`}></div>
          <div className={`${squareStype} animate-[wave_2s_ease_0.4s_infinite]`}></div>
          <div className={`${squareStype} animate-[wave_2s_ease_0.6s_infinite] mr-[-8px]`}></div>
        </div>
      );
    }
    return result;
  };
  return <div className="w-[72px] h-[86px] m-auto">{square()}</div>;
};

export default LoadingIcon;
