import { setLoading, setToken, setUser } from "../../Slice/authSlice";
import { apiConnector } from "../apiConnecter";
import { endpoints } from "../apiEndpoints";
import { toast } from "react-hot-toast";

const { SIGNUP_API, LOGIN_API } = endpoints;

export function signUp(formData, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", SIGNUP_API, formData);

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(error.response.data.message);

      navigate("/register");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function login(formData, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", LOGIN_API, formData);

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      console.log(response.data);
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      dispatch(setUser({ ...response.data.user }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}
