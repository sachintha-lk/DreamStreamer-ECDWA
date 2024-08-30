import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext";
import { FormEvent, useState } from "react";
import {Link} from "react-router-dom"

function Login() {

  const { signIn , user } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(user);
    
    if (password == "") {
      return;
    }
    signIn(email, password)
    console.log(user);
    
    // get the users jwt token
    user?.getSession((err : Error, session: any) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(session.getIdToken().getJwtToken());
    }
    );
  };
    return (
        <div className="w-full lg:grid lg:h-screen lg:grid-cols-2">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>

               
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="me@example.com"
                      required
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link  to={"/forgot-password"}
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input 
                    id="password" 
                    type="password" 
                    required
                    onChange={ (event) => setPassword(event.target.value)}
                     />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:h-full lg:overflow-hidden">
            <img
              src="/images/login-page/ezgif-6-4d4143e895.jpg"
              alt="Image"
              className="h-full w-full object-cover object-top grayscale dark:brightness-75"
            />
          </div>
        </div>
      )
   
}

export default Login