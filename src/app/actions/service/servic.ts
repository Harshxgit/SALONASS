import { prisma } from "@/db";

interface Service {
  servicename: string;
  price: number;
  img: string[];
}

//get all services
export async function getServices():Promise<Service[]> {
    const services = await prisma.service.findMany();
    return services;
} 
//create service
export async function createService({ servicename, price, img }: Service) {
  const name = prisma.service.findUnique({
    where: { servicename },
  });
  if (!name) return { error: "Service already exist" };
  try {
    const serive = await prisma.service.create({
      data: {
        servicename,
        price,
        img,
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
    const service = await prisma.service.update({
      where: { servicename },
      data: {
        price,
        img,
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
    const service = await prisma.service.delete({
      where: { servicename },
    });
    if (!service) return { error: "Service not deleted" };
    return { success: true };
  } catch (error) {
    return { error: "Service failed deleted" };
  }
}
