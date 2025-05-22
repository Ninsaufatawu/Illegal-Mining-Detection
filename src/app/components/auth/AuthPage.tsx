"use client"

import { useState, useEffect } from "react"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  UserCircle, 
  Mail, 
  Key, 
  LogIn, 
  UserPlus, 
  ArrowLeft, 
  Lock, 
  Loader2,
  AlertCircle 
} from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import LoginOptions from "./LoginOptions"
import { signIn, useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [rememberMe, setRememberMe] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const authError = searchParams.get("error")
  
  // Handle NextAuth errors
  useEffect(() => {
    if (authError) {
      switch (authError) {
        case "AccessDenied":
          setError("Access denied. You may not have permission to sign in")
          break
        case "OAuthAccountNotLinked":
          setError("Email already in use with a different provider")
          break
        case "OAuthSignin":
        case "OAuthCallback":
          setError("Error occurred during authentication")
          break
        default:
          setError("Authentication failed. Please try again.")
      }
    }
  }, [authError])
  
  // Redirect if already signed in
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/")
    }
  }, [session, status, router])

  useEffect(() => {
    // Simulating progress bar animation
    setProgress(0)
    const timer = setTimeout(() => setProgress(100), 300)
    return () => clearTimeout(timer)
  }, [isLogin])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Validation
    if (!email || !password) {
      setError("Please fill all required fields")
      setIsLoading(false)
      return
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Sign in using NextAuth's credential provider
      // Note: You'd need to set up a credentials provider in [...nextauth]/route.ts
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      
      if (result?.error) {
        setError(result.error === "CredentialsSignin" 
          ? "Invalid email or password" 
          : "Authentication failed")
      }
      
      // Successful login will redirect automatically due to our session check
    } catch (error) {
      setError("Authentication failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto py-8 px-4">
      <Card className="w-full shadow-md">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center mb-2">
            <a href="/" className="text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-5 w-5" />
            </a>
            <Progress value={progress} className="h-2 w-16" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin 
              ? "Login to monitor mining activities and submit reports" 
              : "Join MineGuard to help protect Ghana's environment"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4 py-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="ml-2 text-xs">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="pl-10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rememberMe" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="rememberMe" className="text-sm">Remember me</Label>
                </div>
                <Button variant="link" className="p-0 h-auto text-xs">
                  Forgot password?
                </Button>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {isLogin ? <LogIn className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                  {isLogin ? "Login" : "Create Account"}
                </>
              )}
            </Button>
          </form>

          <div className="relative mt-6 mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <LoginOptions />
        </CardContent>

        <CardFooter className="flex justify-center border-t py-4">
          <div className="text-sm text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Button 
              variant="link" 
              className="p-0 ml-1 h-auto"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
} 