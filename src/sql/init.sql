
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mysql-sample
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mysql-sample` DEFAULT CHARACTER SET utf8 ;
USE `mysql-sample` ;

-- -----------------------------------------------------
-- Table `mysql-sample`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `pwdHash` VARCHAR(100) NULL DEFAULT NULL,
  `lastLogonDate` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `ux_Users_email` (`email` ASC))
  ENGINE = InnoDB
  AUTO_INCREMENT = 41
  DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mysql-sample`.`User_Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `User_Roles` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` INT(10) UNSIGNED NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_UserRoles_Users_idx` (`userId` ASC),
  CONSTRAINT `fk_UserRoles_Users`
  FOREIGN KEY (`userId`)
  REFERENCES `Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  ENGINE = InnoDB
  DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
