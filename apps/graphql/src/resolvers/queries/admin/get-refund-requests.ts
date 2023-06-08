import { FieldResolver } from "nexus";

const getRefundRequests: FieldResolver<"Query", "getRefundRequests"> = async (
  _,
  args,
  ctx
) => {
  const { prisma } = ctx;

  // adminPermission(ctx)

  const take = args.take ?? 1;
  const filterBy = args.filterBy ?? "";

  const refundRequests = await prisma.refund.findMany({
    skip: args.page * take,
    take: take,
    where: filterBy !== "ALL" ? { status: filterBy } : {},
  });

  return refundRequests;
};

export default getRefundRequests;
