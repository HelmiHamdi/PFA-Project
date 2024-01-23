import { NgModule } from '@angular/core';
import { CategoryPipe } from 'src/app/pipes/category.pipe';

@NgModule({
  declarations: [CategoryPipe],
  exports: [CategoryPipe]
})
export class CategoryPipeModule {}
