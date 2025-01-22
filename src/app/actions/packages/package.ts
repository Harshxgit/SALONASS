"use server";
import prisma from "@/db";
import { Packages } from "@/types/packages";
import { Service } from "@/types/packages";
type Package ={
  id: number;
  packageName: string;
  price: number;
  img: string[];
  service: Service[];
}

//get all packages
export async function getServices(): Promise<Packages[]> {
  const packages = await prisma.packages.findMany({
    include: {
      services: true,
    },
  });
  return packages;
}

//create packages
export default async function createPackages({
  packageName,
  price,
  service,
  img,
}: Package) {
  console.log(packageName, price, service, img);
  const name = prisma.packages.findUnique({
    where: { name: packageName },
  });
  if (!name) return { error: "Package already exist" };
  try {
    console.log("reaching here in service");

    const ispackage = await prisma.packages.create({
      data: {
        name: packageName,
        price: price,
        services: {
          connect: service.map((item) => ({ id: item.id })),
        },
      },
    });

    console.log("reaching here2");
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
