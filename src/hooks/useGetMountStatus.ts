import { useEffect, useState } from "react";


export default function useGetMountStatus(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Update the 'mounted' state to true when the component mounts
    setMounted(true);
  }, []);

  return mounted;
}
