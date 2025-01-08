import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StaffMember as StaffMemberType } from "@/types/staff"

interface StaffMemberProps {
  staff: StaffMemberType
  selectedDate: string
}

  
export default function StaffMember({ staff, selectedDate }: StaffMemberProps) {
  const availability = staff.availability[selectedDate] || []
  const isAvailable = availability.length > 0

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {staff.name}
          <Badge variant={isAvailable ? 'default' : 'secondary'}>
            {isAvailable ? 'Available' : 'Unavailable'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isAvailable ? (
          <ul className="space-y-2">
            {availability.map((slot, index) => (
              <li key={index} className="flex items-center">
                <span className="w-20">{slot.start}</span>
                <span className="mx-2">-</span>
                <span className="w-20">{slot.end}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No availability for this date.</p>
        )}
      </CardContent>
    </Card>
  )
}

