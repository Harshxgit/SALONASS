"use server";
import prisma from "@/db";
import { Packages } from "@/types/packages";
import { Service } from "@/types/packages";
type Package = {
  packageName: string;
  price: number;
  service: Service[];
  description: string;
};

//get all packages
export async function getPackages(): Promise<Packages[]> {
  const packages = await prisma.packages.findMany({
    include: {
      services: true,
    },
  });
  return packages.map((pkg) => ({
    ...pkg,
    services: pkg.services.map((service) => ({
      ...service,
      img: Array.isArray(service.img) ? (service.img as string[]) : [],
    })),
    img: Array.isArray(pkg.img) ? (pkg.img as string[]) : [],
  }));
}

//create packages
export default async function createPackages({
  packageName,
  price,
  service,
  description,
}: Package) {

  const name = prisma.packages.findUnique({
    where: { name: packageName },
  });
  if (!name) return { error: "Package already exist" };
  try {
   

    const ispackage = await prisma.packages.create({
      data: {
        name: packageName,
        price: price,
        services: {
          connect: service.map((item) => ({ id: item.id })),
        },
        description: description,
      },
    });

    if (!service) return { error: "Service not created" };
    return { success: true, serviceid: ispackage.id };
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
