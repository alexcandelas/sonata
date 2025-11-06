import testUtility from '../../utils/testUtility.js';
import { it } from "vitest";

it.each([
    ['@container', '.\\@container { container-type: inline-size; }'],
    ['@container/theName', `.\\@container\\/theName { 
        container-name: theName;
        container-type: inline-size;
    }`],
    ['@container/The-Name_123', `.\\@container\\/The-Name_123 { 
        container-name: The-Name_123;
        container-type: inline-size;
    }`],
    ['@container/invalid@name', ''],
])('generates responsive container utilities (%s)', testUtility);
