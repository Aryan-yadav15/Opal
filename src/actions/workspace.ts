"use server";

import { client } from "@/lib/prisma";
import { onAuthenticateUser } from "./user";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAcessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };

    const isUserInWorkspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkid: user.id,
            },
          },
        ],
        members: {
          every: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    });

    return {
      status: 200,
      data: { workspace: isUserInWorkspace },
    };
  } catch (error) {
    return {
      status: 403,
      workspace: null,
    };
  }
};