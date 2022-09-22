//styled-components
import { Overlay } from "./styles";

//PropTypes
import PropTypes from 'prop-types';

//components
import Spinner from "../Spinner";
import ReactPortal from "../ReactPortal";

export default function Loader({ isLoading }) {

  if (!isLoading) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}
