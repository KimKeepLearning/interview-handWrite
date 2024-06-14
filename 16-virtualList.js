const height = 60;
const bufferSize = 5;

const visibleCount = Math.ceil(window.clientHeight / height);
const VirtualizedList = () => {
  const [startOffset, setStartOffset] = useState();
  const [endOffset, setEndOffset] = useState();
  const [visibleData, setVisibleData] = useState([]);
  const startIndex = useRef(0);
  const endIndex = useRef(0);
  const scrollTop = useRef(0);

  return (
    <div>
      <div style={{ paddingTop: `${startOffset}px`, paddingBottom: `${endOffset}px`  }}>
        {

        }
      </div>
    </div>
  )

}