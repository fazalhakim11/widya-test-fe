import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../stores/slices/authSlice";

const index = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout =()=>{
    if (!confirm("Are you sure you want to logout?")) return
    dispatch(logout())
    navigate("/")
  }

  return (
    <nav className="bg-black text-white flex justify-between p-5 mb-5">
        <div className="flex gap-2">
        <ul><li>{user.name.split(" ")[0]}</li></ul>
        <ul><li><Link to="/products">Product</Link></li></ul>
        <ul><li><Link to="/profile">Profile</Link></li></ul>
        </div>
        <button onClick={handleLogout}> Logout</button>
    </nav>
  )
};

export default index
