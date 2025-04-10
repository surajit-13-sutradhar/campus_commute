import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/clerk-react"

function App() {

  return (
    <header >
        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
            <SignOutButton />
        </SignedIn>

        {/* Verify As Secy or Prof Route */}
        
    </header>
  )
}

export default App
