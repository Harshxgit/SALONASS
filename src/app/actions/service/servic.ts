"use server"
import prisma from "@/db";

interface Service {
  servicename: string;
  price: number;
  duration : number
  img?: string[];
}

//get all services
export async function getServices():Promise<Service[]> {
    const services = await prisma.services.findMany({});
    return services;
} 

//create service
export default async function createService({ servicename, price, duration}: Service) {
  const name = prisma.services.findUnique({
    where: { servicename:servicename },
  });
  if (!name) return { error: "Service already exist" };
  try {
    console.log("reaching here in service")
    
    const service = await prisma.services.create({
      data: {
        servicename:servicename,
        price:price,
        duration : duration
      },
    });

    console.log("reaching here2")
    if (!service) return { error: "Service not created" };
    return { success: true , serviceid : service.id };
  } catch (error) {
    return { error: "Service created failed" };
  }
}
//update service
export async function updateService({ servicename, price, img }: Service) {
  try {
    const service = await prisma.services.update({
      where: { servicename:servicename },
      data: {
        price:price,
        img:img,
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
      where: { servicename:servicename },
    });
    if (!service) return { error: "Service not deleted" };
    return { success: true };
  } catch (error) {
    return { error: "Service failed deleted" };
  }
}
