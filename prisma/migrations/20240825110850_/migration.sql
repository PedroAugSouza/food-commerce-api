/*
  Warnings:

  - The values [drink,food] on the enum `Product_category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `category` ENUM('DRINK', 'FOOD') NOT NULL;
