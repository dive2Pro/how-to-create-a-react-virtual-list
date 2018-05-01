import React from "react";
import { render } from "react-dom";

class App extends React.PureComponent {
  static defaultProps = {
    data: [],
    size: 30
  };
  state = {
    offset: this.props.offset || 0
  };
  handleScroll = e => {
    const scrollTop = e.target.scrollTop;

    this.setState({ offset: scrollTop });
  };

  render() {
    const { offset } = this.state;

    const {
      size, // 每行的高度
      outerHeight, // 视口的高度
      data,
      renderItem
    } = this.props;
    const items = [];
    // 计算哪些 data 是需要展现的
    const start = Math.floor(offset / size);
    let sizeOffCount = 0;
    // 计算多少个 `item` 的高度可以填满, 这个数量 * size >= outerHeight
    for (let i = 0; i <= outerHeight; ) {
      sizeOffCount++;
      i += size;
    }
    let itemStyle = {
      position: "absolute",
      top: "0px"
    };
    const heightOffset = start * size;
    const end = start + sizeOffCount;

    data.slice(start, end).forEach((d, i) => {
      // 计算每一个的 style
      itemStyle.top = heightOffset + (i + 1) * size;
      items.push(renderItem(d, { ...itemStyle }, i + start));
    });

    return (
      <div
        style={{
          height: outerHeight,
          position: "relative",
          overflow: "auto"
        }}
        onScroll={this.handleScroll}
      >
        <div
          style={{
            position: "relative",
            height: data.length * size
          }}
        >
          {items}
        </div>
      </div>
    );
  }
}
const DATA = new Array(1000).fill(0).map((_, i) => " _-_ " + i + " _-_ ");
render(
  <App
    data={DATA}
    outerHeight={200}
    renderItem={(d, style, index) => {
      return <div style={style}> {d} </div>;
    }}
  />,
  document.getElementById("root")
);
