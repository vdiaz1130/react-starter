import React from 'react';

interface IButtonProps {
  countBy?: number;
  text: string;
  border: string;
}

interface IButtonState {
  count: number;
}

// Statefull
class Button extends React.Component<IButtonProps> {
  public static defaultProps: Partial<IButtonProps> = {
    countBy: 1
  };

  public state: IButtonState = {
    count: 0
  };

  public increase = () => {
    const countBy: number = this.props.countBy!;
    const count = this.state.count + countBy;
    this.setState({ count });
  };

  render() {
    const { text, border } = this.props;
    const style = {
      border: `5px solid ${border === 'success' ? 'green' : 'red'}`
    };

    return (
      <button onClick={this.increase} style={style}>
        {text}, My favorite number is {this.state.count}
      </button>
    );
  }
}

const areEqual = (
  prevProps: Partial<IButtonProps>,
  nextProps: Partial<IButtonProps>
) => {
  // React.memo 2nd param to verify if props are == before re-rendering.
  // Optional function in order to do the verification manually.
  // Use on pure components (i.e. stateless)
  return (
    prevProps.text === nextProps.text || prevProps.border === nextProps.border
  );
};

// Stateless
const ButtonStl = React.memo(({ text, border }: IButtonProps) => {
  const style = {
    border: `5px solid ${border === 'success' ? 'green' : 'red'}`
  };
  return <button style={style}>{text}</button>;
}, areEqual);

export { Button as default, ButtonStl };
