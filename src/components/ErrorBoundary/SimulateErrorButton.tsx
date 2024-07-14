type SimulateErrorButtonProps = {
  onClick: () => void;
};

const SimulateErrorButton: React.FC<SimulateErrorButtonProps> = ({
  onClick,
}) => {
  return <button onClick={onClick}>Simulate Error</button>;
};

export default SimulateErrorButton;
