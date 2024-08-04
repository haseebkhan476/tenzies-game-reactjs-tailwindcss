function Die(props) {
    const style = props.isHeld ? "text-white bg-black border-none" : "border border-gray-300 hover:border-black";
  return (
    <div 
        className={`w-16 h-16 m-auto flex items-center justify-center rounded-full text-3xl duration-300 cursor-pointer font-bold ${style}`}
        onClick={props.holdDice}
    >
      {props.value}
    </div>
  );
}

export default Die;
