function Checkerboard() {
    const rows = 8;
    const cols = 8;
  
    const board = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push(
          <div
            className={`cell ${i % 2 === j % 2 ? 'cell-white' : 'cell-black'}`}
            key={`${i}-${j}`}
          ></div>
        );
      }
      board.push(
        <div className="row" key={i}>
          {row}
        </div>
      );
    }
  
    return <div className="checkerboard">{board}</div>;
  }
  export default Checkerboard;
  