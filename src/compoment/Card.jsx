import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function SocialEventsUI() {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {/* Suggested Profile */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">You might like</h3>
          <a href="#" className="text-blue-500 text-sm">See all</a>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <Avatar className="w-10 h-10" />
          <div className="flex-1">
            <p className="font-medium">Mohammad Rafil</p>
            <p className="text-xs text-gray-500">15 Mutuals</p>
          </div>
        </div>
        <div className="mt-3 flex space-x-2">
          <Button className="bg-pink-500">Follow</Button>
          <Button variant="outline">Ignore</Button>
        </div>
      </Card>
      
      {/* Upcoming Events */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Upcoming Events</h3>
          <a href="#" className="text-blue-500 text-sm">See all</a>
        </div>
        {[1, 2].map((event, index) => (
          <div key={index} className="p-3 mt-3 rounded-lg bg-gray-100">
            <Badge className="text-green-600 bg-green-100">Design Talks</Badge>
            <p className="text-sm text-gray-500">12 Oct, 13:00 IST</p>
            <p className="text-xs mt-1">
              A General talk about design with Sr Designer of Logitech Michael Spunfik.
            </p>
            <div className="flex items-center mt-2 text-sm text-gray-600">
              <Avatar className="w-6 h-6" />
              <span className="ml-2">+8</span>
              <span className="ml-auto">112 Joined</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
