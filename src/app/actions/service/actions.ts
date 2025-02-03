"use server";
import prisma from "@/db";
import Service from "@/types/service";
interface Servicee {
  servicename: string;
  price: number;
  type: string;
  duration: number;
  description : string
}

//get all services
export async function getServices(): Promise<Service[]> {
  try{
    const services = await prisma.services.findMany({});
    return services.map(service => ({
      ...service,
      img: Array.isArray(service.img) ? (service.img as string[]) : [], // Ensure img is always an array
    }))

  }catch(error){
      console.log("got failed error"+error)
      return []; // Return an empty array in case of error
  }
}

//create service
export default async function createService({
  servicename,
  price,
  duration,
  type,
  description
}: Servicee) {
  console.log(servicename,price,duration,type,description)
  const name = prisma.services.findUnique({
    where: { servicename: servicename },
  });
  if (!name) return { error: "Service already exist" };
  try {
    console.log("reaching here in service");

    const service = await prisma.services.create({
      data: {
        servicename: servicename,
        price: price,
        duration: duration,
        type: type,
        description: description ||"hkjjhjkh", // Add a default or dynamic description here
      },
    });

    console.log("reaching here2");
    if (!service) return { error: "Service not created" };
    return { success: true, serviceid: service.id };
  } catch (error) {
    return { error: "Service created failed" };
  }
}
//update service
export async function updateService({ servicename, price, img }: Service) {
  try {
    const service = await prisma.services.update({
      where: { servicename: servicename },
      data: {
        price: price,
        img: img,
      },
    });
    if (!service) return { error: "Service not updated" };
    return { success: true };
  } catch (error) {
    return { error: "Service failed updated" };
  }
}
//delete service
export async function deleteService(servicename: string) {
  try {
    const service = await prisma.services.delete({
      where: { servicename: servicename },
    });
    if (!service) return { error: "Service not deleted" };
    return { success: true };
  } catch (error) {
    return { error: "Service failed deleted" };
  }
}
