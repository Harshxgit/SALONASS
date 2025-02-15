import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserProfileProps {
  name: string
  profession: string
  avatarUrl?: string
}

export default function UserProfile({ name }: UserProfileProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex flex-col items-center space-y-2 p-4 bg-background rounded-lg shadow-md w-40">
      <Avatar className="h-20 w-20 border border-primary">
        {/* <AvatarImage src={avatarUrl} alt={name} /> */}
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <h2 className="text-md font-semibold text-center">{name}</h2>
      {/* <p className="text-xs text-muted-foreground text-center">{profession}</p> */}
    </div>
  )
}

