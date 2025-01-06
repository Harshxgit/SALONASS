import { prisma } from "@/db";

interface Service {
  servicename: string;
  price: number;
  img: string[];
}

//get all services
export async function getServices():Promise<Service[]> {
    const services = await prisma.services.findMany();
    return services;
} 

//create service
export async function createService({ servicename, price, img }: Service) {
  const name = prisma.services.findUnique({
    where: { servicename:servicename },
  });
  if (!name) return { error: "Service already exist" };
  try {
    const serive = await prisma.services.create({
      data: {
        servicename:servicename,
        price:price,
        img:img,
      },
    });

    if (!serive) return { error: "Service not created" };
    return { success: true };
  } catch (error) {
    return { error: "Service failed created" };
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
