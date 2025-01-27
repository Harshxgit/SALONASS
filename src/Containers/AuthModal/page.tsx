import { AutoPopupAuth } from "./autcomp/authpopup"

export default function AUTHCOMP() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Welcome to Our App</h1>
      <p className="text-xl text-white mb-12">Experience the future of web applications</p>
      <AutoPopupAuth />
    </div>
  )
}

