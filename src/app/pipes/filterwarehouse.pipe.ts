import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterwarehouse'
})
export class FilterwarehousePipe implements PipeTransform {

  transform(value: any, filteredString: string): any[] {
    if (value.length === 0 || filteredString ===''){
      return value;
    }
    // return value.filter(
    //   (item:any) => item.name.toLocalLowerCase().includes(filteredString.toLocaleLowerCase())
    //   );

    const categoryList:any = [];
    for (const item of value){
      if (item['item_serial'] == filteredString
        || item['description'] == filteredString
        || item['name'] == filteredString){
        categoryList.push(item);
        console.log("Search written and added: ", item);
      }
    }
    console.log(categoryList);
    return categoryList;
  }

}
