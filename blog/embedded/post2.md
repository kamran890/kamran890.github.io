# Exploring Linux Drivers

Linux drivers are essentially kernel modules that facilitate communication between the kernel and hardware devices.

## Kernel Modules: The Building Blocks

Kernel modules are loadable pieces of code that extend the kernel's functionality. A simple module includes initialization and cleanup functions.


```c
#include <linux/module.h>
#include <linux/kernel.h>

static int __init init_module(void) {
    printk(KERN_INFO "Driver loaded\n");
    return 0;
}

static void __exit cleanup_module(void) {
    printk(KERN_INFO "Driver unloaded\n");
}

module_init(init_module);
module_exit(cleanup_module);
```

## File Operations: Interfacing with Devices

File operations in a Linux driver define how the driver handles system calls. These operations include open, read, write, and release.

```c
#include <linux/fs.h>

static int device_open(struct inode *inode, struct file *file) {
    // Open code
    return 0;
}

static ssize_t device_read(struct file *file, char __user *buffer, size_t length, loff_t *offset) {
    // Read code
    return 0;
}

static struct file_operations fops = {
    .open = device_open,
    .read = device_read,
    // more operations
};
```

## Platform Device Drivers

Platform device drivers are used in Linux for devices that are not self-enumerating, meaning they can't be automatically detected by the system. These devices are typically embedded directly into the system's hardware, such as SoC (System on Chip) components in embedded systems. The kernel doesn't have a standard way to detect these devices; instead, they are often declared in the system's hardware description, like the device tree.


```c
#include <linux/module.h>
#include <linux/platform_device.h>

static int my_platform_driver_probe(struct platform_device *pdev) {
    // Device initialization code goes here
    printk(KERN_INFO "Platform device [%s] probed\n", pdev->name);
    return 0;
}

static int my_platform_driver_remove(struct platform_device *pdev) {
    // Cleanup code goes here
    printk(KERN_INFO "Platform device [%s] removed\n", pdev->name);
    return 0;
}

static struct platform_driver my_platform_driver = {
    .probe = my_platform_driver_probe,
    .remove = my_platform_driver_remove,
    .driver = {
        .name = "my_platform_driver",
        .owner = THIS_MODULE,
    },
};

module_platform_driver(my_platform_driver);
```

In this code, the probe function is called when a matching device is found, and the remove function is called when the device is removed or the driver module is unloaded.
Device Tree

## Device Tree

The device tree is a data structure used to describe the hardware components and their configuration in a system. It is particularly useful for systems where hardware is not discoverable by the operating system at runtime. The device tree defines hardware resources like memory regions, I/O addresses, interrupt numbers, and peripheral devices.

The device tree is written in a format called DTS (Device Tree Source), which is compiled into a binary format called DTB (Device Tree Blob) used by the kernel at boot time.

```
mydevice@0 {
    compatible = "mycompany,mydevice";
    reg = <0x03F00000 0x1000>;
    interrupts = <17>;
    status = "okay";
};
```
- mydevice@0: A device node, where 0 often represents the physical address.
- compatible: A string to match the device with the appropriate driver.
- reg: Specifies the base address and size of the device's memory region.
- interrupts: The interrupt number associated with the device.
- status: Indicates whether the device is enabled or disabled.

## Interrupt handling

Interrupt handling is a critical aspect of driver development, used to respond to hardware signals.
Top and Bottom Halves

Interrupt handling is often divided into two parts:

- Top Half: The immediate response to an interrupt, which executes quickly and schedules the bottom half.
- Bottom Half: Deferred work that runs after the top half.

**Handling Top Halves**

The top half of the interrupt is managed using interrupt service routines (ISR).


```c
#include <linux/interrupt.h>

irqreturn_t my_interrupt_handler(int irq, void *dev_id) {
    // Top half code
    return IRQ_HANDLED;
}

static int __init my_driver_init(void) {
    request_irq(IRQ_NUMBER, my_interrupt_handler, IRQF_SHARED, "my_interrupt", MY_DEV);
    return 0;
}

static void __exit my_driver_exit(void) {
    free_irq(IRQ_NUMBER, MY_DEV);
}
```

**Bottom Halves: Tasklets and Workqueues**

- Tasklets: Lightweight, cannot sleep, and are suitable for quick, atomic operations.
- Workqueues: Can sleep, thus suitable for longer tasks.

```c
#include <linux/interrupt.h>

void my_tasklet_function(unsigned long data) {
    // Bottom half code
}

DECLARE_TASKLET(my_tasklet, my_tasklet_function, 0);

irqreturn_t my_interrupt_handler(int irq, void *dev_id) {
    tasklet_schedule(&my_tasklet);
    return IRQ_HANDLED;
}
```
