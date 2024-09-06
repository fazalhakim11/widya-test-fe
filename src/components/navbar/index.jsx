import { Link } from "react-router-dom";

const index = () => {
  return (
    <nav>
        <ul><li><Link to="/products">Product</Link></li></ul>
        <ul><li><Link to="/profile">Profile</Link></li></ul>
    </nav>
  )
};

export default index
