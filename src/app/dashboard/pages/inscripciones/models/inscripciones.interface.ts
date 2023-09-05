import { StudentInterface } from "../../alumnos/interfaces/student.interface"; 
import { CourseInterface } from "../../cursos/models/curso.interface";

export interface InscripcionesInterface {
    id: number;
    student: StudentInterface;
    course: CourseInterface;
    enabled: boolean;
}