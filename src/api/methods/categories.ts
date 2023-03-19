import { supabase } from '../sendRequest';

// TODO:
interface CategoryEntry {
  id: string;
  name: string;
}

const categoriesTable = () => supabase().from<CategoryEntry>('categories');

export const getCategories = async () => {
  const { data, error } = await categoriesTable().select('id, name');

  if (data) {
    return data;
  }

  throw new Error(error.message ?? 'error getCategories');
};

export const uploadCategories = async (categories: CategoryEntry[]) => {
  // TODO: transaction
  // TODO: filter
  const deleteResult = await categoriesTable().delete().not('id', 'is', null);

  if (deleteResult.error) {
    alert(deleteResult.error.message);
    throw deleteResult.error;
  }

  const insertResult = await categoriesTable().insert(categories);
  if (insertResult.error) {
    alert(insertResult.error.message);
    throw insertResult.error;
  }
};
