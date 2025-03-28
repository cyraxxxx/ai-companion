import { Categories } from "@/components/categories";
import { Companions } from "@/components/companions";
import { SearchInput } from "@/components/search-input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import {useTranslations} from 'next-intl';



interface PageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

const HomePageTitle = () => {
  const t = useTranslations('HomePage');
  return <Card className="rounded-xl border-0 bg-primary/10">
      <CardHeader className="text-xl font-semibold text-primary/60">
      {t('howItWorks')}
      </CardHeader>
      <CardContent className="text-sm">
      <ul className="list-inside list-decimal">
        <li>{t('howItWorks1')}</li>
        <li>{t('howItWorks2')}</li>
      </ul>
      </CardContent>
    </Card>;
};


const Page = async ({ searchParams }: PageProps) => {
  const { userId } = auth();


  let data;
  if (userId) {
    data = await prismadb.companion.findMany({
      where: {
        categoryId: searchParams.categoryId,
        name: {
          contains: searchParams.name,
          //mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            messages: {
              where: {
                userId,
              },
            },
          },
        },
      },
    });
  } else {
    data = await prismadb.companion.findMany({
      where: {
        categoryId: searchParams.categoryId,
        name: {
          contains: searchParams.name,
          //mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  const categories = await prismadb.category.findMany();



  return (

    <div className="h-full space-y-2 p-4">
      {/* <SearchInput /> */}
      {/* <Categories data={categories} /> */}
      <HomePageTitle />

      <Companions data={data} />
    </div>

  );
};

export default Page;
