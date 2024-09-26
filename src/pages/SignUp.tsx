import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Link, useNavigate} from "react-router-dom"
import { useState, FormEvent, useEffect } from "react";
import { useAuth } from "@/context/Auth/AuthContext";


function SignUp() {

    const { signUp, user } = useAuth();

    const navigate = useNavigate();
    useEffect(() => {
      if (user) {
        navigate('/dashboard'); 
      }
    }, [user, navigate]);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log(user);
      console.log(email, password, confirmPassword);
      if (name.trim() == "" || password == "" || password != confirmPassword) {
        return;
      }
      signUp(name, password, email)
        .then((data) => {
          console.log(data);
          navigate('/dashboard');

      });
      console.log(user);
    };

    return (
        <div className="w-full lg:grid lg:h-screen lg:grid-cols-2">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              </div>
              <form onSubmit={handleSubmit}>

              <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
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
                    </div>
                    <Input id="password" type="password" required 
                    onChange={ (event) => setPassword(event.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                    </div>
                    <Input id="confirm-password" type="password" required 
                    onChange={ (event) => setConfirmPassword(event.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                  <Button variant="outline" className="w-full"
                  onClick={() => {
                    user?.getSession((err: Error, session: any) => {
                          if (err) {
                            console.error(err);
                            alert(err);
                            return;
                          }
                          console.log(session.getIdToken().getJwtToken());
                          alert(session.getIdToken().getJwtToken());
                        });
                      }
                    }
                  >
                    Check the user
                  </Button>
                </div>
                </form>
                
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="underline">
                    Login
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

export default SignUp